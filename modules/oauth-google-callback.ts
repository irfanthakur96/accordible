import { ZuploRequest, ZuploContext, environment } from "@zuplo/runtime";
import { environment } from "@zuplo/runtime";

const clientId = environment.GOOGLE_CLIENT_ID;
const clientSecret = environment.GOOGLE_CLIENT_SECRET;
const redirectUri = environment.GOOGLE_REDIRECT_URI;


export default async function (request: ZuploRequest, context: ZuploContext) {
  const code = request.query.code;

  if (!code) {
    return new Response("Authorization failed", { status: 400 });
  }

  // Exchange code for tokens
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      client_id: environment.GOOGLE_CLIENT_ID,
      client_secret: environment.GOOGLE_CLIENT_SECRET,
      redirect_uri: environment.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const tokens = await tokenResponse.json();

  return new Response(`
    <script>
      window.opener.postMessage(${JSON.stringify(tokens)}, '*');
      window.close();
    </script>
  `, {
    headers: { "Content-Type": "text/html" }
  });
}
