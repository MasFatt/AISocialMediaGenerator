// lib/gemini.ts
export async function generateSocialPost(
  data: {
    topic: string;
    platform: string;
    style: string;
    includeEmoji: boolean;
    includeHashtag: boolean;
  },
  apiKey: string
): Promise<string> {
  const prompt = `
Anda adalah asisten penulisan konten profesional.

Buatkan 1 postingan media sosial untuk platform **${data.platform
    }** dengan topik:
"${data.topic}".

Gunakan gaya penulisan yang ${data.style.toLowerCase()}.
${data.includeEmoji
      ? "- Sertakan emoji secara natural, tidak berlebihan.\n"
      : "- Jangan sertakan emoji apapun dalam postingan.\n"
    }
${data.includeHashtag
      ? "- Sertakan hashtag relevan di akhir postingan.\n"
      : "- Jangan sertakan hashtag apapun dalam postingan.\n"
    }
Pastikan:
- Cocok dengan karakteristik audiens di platform tersebut.
- Bahasa yang menarik dan mudah dipahami.
- Panjangnya sesuai standar ${data.platform}.
- Hindari kata yang bersifat terlalu umum atau klise.

Tulis hanya teks postingannya saja, tanpa tambahan penjelasan lain.
    `;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error("INVALID_API_KEY");
    }
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();

  const output = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!output) {
    throw new Error("Empty response from API");
  }

  return output;
}
