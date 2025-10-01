import { z } from "zod";
import { exchangeRatesSchema, type ExchangeRates } from "../types";

const API_URL = "https://open.er-api.com/v6/latest/USD";

const responseSchema = z.object({
  result: z.literal("success"),
  rates: exchangeRatesSchema,
});

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
  const { rates } = responseSchema.parse(data);
  return rates;
};
