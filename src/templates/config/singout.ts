export const nextSignOutTemplate = () => `
import { NextApiRequest, NextApiResponse } from 'next';
import { signOut } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: 'Erro ao realizar logout', error: errorMessage });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
`;