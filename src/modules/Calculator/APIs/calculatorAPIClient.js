// @flow
import { calculatorApiAdress } from "../../../config";

type ApiResponse = { value: string } | { error: string };

const calculatorApiClient = {
  async evaluate(expression?: string): Promise<ApiResponse> {
    return expression
      ? fetch(
          `${calculatorApiAdress || ""}/evaluate/${encodeURIComponent(
            expression
          )}`
        ).then((r) => r.json())
      : { value: "" };
  },
};

export default calculatorApiClient;
export type { ApiResponse };
