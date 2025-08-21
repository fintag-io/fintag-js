import axios from "axios";

async function createHmacSha256(key: string, message: string): Promise<string> {
  // Node.js environment
  if (typeof process !== "undefined" && process.versions?.node) {
    const { createHmac } = await import("crypto");
    return createHmac("sha256", key).update(message).digest("hex");
  }

  // Browser environment (Web Crypto API)
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const enc = new TextEncoder();
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(key),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  throw new Error("No crypto support detected");
}

export class FintagClient {
  private apiKey: string;
  private readonly baseUrl = "<API_BASE_URL>";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generate signed headers
  private async getHeaders() {
    const timestamp = Date.now().toString();
    const signature = await createHmacSha256(this.apiKey, timestamp);

    return {
      authorization: this.apiKey,
      "x-timestamp": timestamp,
      "x-signature": signature,
    };
  }

  async verify(fintag: string) {
    const cleaned_fintag = fintag.startsWith("#") ? fintag.slice(1).trim() : fintag.trim();
    try {
      const res = await axios.get(
        `${this.baseUrl}/fintag/verify/${cleaned_fintag}`,
        { headers: await this.getHeaders() }
      );
      return res.data;
    } catch (error: any) {
      if (error.response) {
        return { error: true, status: error.response.status, data: error.response.data };
      } else {
        return { error: true, message: error.message };
      }
    }
  }

  async getWalletInfo(fintag: string) {
    const cleaned_fintag = fintag.startsWith("#") ? fintag.slice(1).trim() : fintag.trim();
    try {
      const res = await axios.get(
        `${this.baseUrl}/fintag/wallet/${cleaned_fintag}`,
        { headers: await this.getHeaders() }
      );
      return res.data;
    } catch (error: any) {
      if (error.response) {
        return { error: true, status: error.response.status, data: error.response.data };
      } else {
        return { error: true, message: error.message };
      }
    }
  }
}
