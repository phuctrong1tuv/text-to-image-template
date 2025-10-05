export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const prompt = url.searchParams.get("prompt") || "beautiful landscape";

      const inputs = { prompt };

      // Gọi model AI của Cloudflare
      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs
      );

      // Trả về ảnh + bật CORS để frontend gọi được
      return new Response(response, {
        headers: {
          "content-type": "image/png",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
