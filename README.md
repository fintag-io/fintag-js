# FinTag JavaScript SDK

The FinTag JavaScript SDK provides a simple and efficient way to interact with the FinTag API. With this SDK, you can easily integrate FinTag's powerful features into your JavaScript applications.

## Installation

To install the FinTag JavaScript SDK, use npm:

```bash
npm install @fintag/js
```

## Usage

Here's a quick example of how to use the FinTag JavaScript SDK:

```javascript
import { FintagClient } from "@fintag/js";

const client = new FintagClient("your-api-key");

// Verify a FinTag
const verificationResult = await client.verify("fintag-id");

// Get wallet information
const walletInfo = await client.getWalletInfo("fintag-id");
```

## API Reference

### FintagClient

#### constructor(apiKey: string)

Creates a new instance of the FintagClient.

- `apiKey`: Your API key for authenticating requests.

#### verify(fintag: string)

Verifies a FinTag.

- `fintag`: The ID of the FinTag to verify.

Returns a promise that resolves with the verification result.

#### getWalletInfo(fintag: string)

Retrieves wallet information for a FinTag.

- `fintag`: The ID of the FinTag to retrieve wallet information for.

Returns a promise that resolves with the wallet information.


## Contributing

We welcome contributions to the FinTag JavaScript SDK! If you'd like to contribute, please fork the repository and submit a pull request.

