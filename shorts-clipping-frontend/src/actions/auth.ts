"use server";

import { hashPassword } from "~/lib/auth";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { db } from "~/server/db";

type SignupResult = {
  success: boolean;
  error?: string;
};
export async function signUp(data: SignupFormValues): Promise<SignupResult> {
  const validationResult = signupSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message ?? "Invalid Input",
    };
  }

  const { email, password } = validationResult.data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already exists",
      };
    }

    const hashedPassword = await hashPassword(password);

    // todo: make it to work
    // const stripe = new Stripe("your-stripe-secret-key"); // todo

    // const stripeCustomer = await stripe.customers.create({
    //   email: email.toLowerCase(),
    // });

    await db.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        // stripeCustomerId: stripeCustomer.id,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
