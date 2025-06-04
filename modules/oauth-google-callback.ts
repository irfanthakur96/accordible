import { ZuploRequest, ZuploContext } from "@zuplo/runtime";

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
      client_id: context.env.GOOGLE_CLIENT_ID,
      client_secret: context.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: context.env.GOOGLE_REDIRECT_URI,
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
