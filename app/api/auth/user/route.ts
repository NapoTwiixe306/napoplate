import { NextResponse } from "next/server";
import prisma from "../../../../src/utils/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    //check si l'email existe déjà ou pas
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exist" },
        { status: 409 },
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "somethings went wrong!" },
      { status: 500 },
    );
  }
}

