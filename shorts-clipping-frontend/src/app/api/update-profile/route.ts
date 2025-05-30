/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 },
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    const { name, email } = result.data;

    // Check if email is already taken by another user
    const existingUser = await db.user.findFirst({
      where: {
        email,
        NOT: {
          id: session.user.id,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already taken by another user" },
        { status: 409 },
      );
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        // updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        credits: true,
        emailVerified: true,
        stripeCustomerId: true,
        // updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Email is already in use" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error - Please try again later" },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
