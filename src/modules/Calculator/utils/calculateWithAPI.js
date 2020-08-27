// @flow
import apiClient, { type ApiResponse } from "../APIs/calculatorAPIClient";

const calculate = async (expression: string) => {
  return await apiClient
    .evaluate(expression)
    .then((response: ApiResponse) =>
      response.error ? { error: "ERROR" } : `${response.value}`
    );
};

export default calculate;
