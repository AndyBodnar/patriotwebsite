import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
  : 'http://localhost:3001/api/auth/google/callback';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // service ID
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/system/settings?error=oauth_denied&service=${state}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL(`/system/settings?error=no_code&service=${state}`, request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(
        new URL(`/system/settings?error=token_exchange_failed&service=${state}`, request.url)
      );
    }

    const tokens = await tokenResponse.json();

    // Send tokens to your VPS backend to store in database
    const saveResponse = await fetch(`${API_BASE_URL}/api/patriot/settings/oauth-tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: state,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
        tokenType: tokens.token_type,
        scope: tokens.scope,
      }),
    });

    if (!saveResponse.ok) {
      console.error('Failed to save tokens to backend');
      // Continue anyway - tokens might still work
    }

    // Redirect back to settings with success
    // Include tokens in URL hash for frontend to pick up (temporary)
    const successUrl = new URL(`/system/settings`, request.url);
    successUrl.searchParams.set('oauth_success', state || '');
    successUrl.hash = encodeURIComponent(JSON.stringify({
      serviceId: state,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    }));

    return NextResponse.redirect(successUrl.toString());
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`/system/settings?error=oauth_failed&service=${state}`, request.url)
    );
  }
}
