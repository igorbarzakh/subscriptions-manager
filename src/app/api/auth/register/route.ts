import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Пароль должен быть минимум 8 символов' }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: body.name?.trim() || null,
        passwordHash,
      },
      select: { id: true, email: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
