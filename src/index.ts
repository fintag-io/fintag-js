// sdk/index.ts
import axios from "axios";
import crypto from "crypto";

export class FintagClient {
  private apiKey: string;
  private readonly baseUrl = "<API_BASE_URL>"; // Base URL for the Fintag API

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generate signed headers
  private getHeaders() {
    const timestamp = Date.now().toString();
    const signature = crypto
      .createHmac("sha256", this.apiKey)
      .update(timestamp)
      .digest("hex");

    return {
      "authorization": this.apiKey,
      "x-timestamp": timestamp,
      "x-signature": signature,
    };
  }

  async verify(fintag: string) {
    const cleaned_fintag = fintag.startsWith("#") ? fintag.slice(1).trim() : fintag.trim();
    const res = await axios.get(
      `${this.baseUrl}/fintag/verify/${cleaned_fintag}`,
      { headers: this.getHeaders() }
    );
    return res.data;
  }

  async getWalletInfo(fintag: string) {
    const cleaned_fintag = fintag.startsWith("#") ? fintag.slice(1).trim() : fintag.trim();
    const res = await axios.get(
      `${this.baseUrl}/fintag/wallet/${cleaned_fintag}`,
      { headers: this.getHeaders() }
    );
    return res.data;
  }
}
