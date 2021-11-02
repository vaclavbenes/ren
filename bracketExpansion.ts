import {
  range,
} from "https://raw.githubusercontent.com/vaclavbenes/range/master/range.ts";

export type Range = number | string;

const removeCurly = (value: string) => {
  return value.replace("{", "").replace("}", "");
};

const isNumeric = (num: any) => {
  return isNaN(num);
};

const bracketExpression = (value: string): string[] | Range[] => {
  // use basic {1,2} nebo {1..3}  , dont use in nested {1{}}}
  if (value.includes(",")) {
    value = removeCurly(value);
    return value.split(",");
  } else if (value.includes("..")) {
    value = removeCurly(value);

    const numbers = value.split("..");

    const min = isNumeric(numbers[0]) ? numbers[0] : parseInt(numbers[0]);
    const max = isNumeric(numbers[numbers.length - 1])
      ? numbers[numbers.length - 1]
      : parseInt(numbers[numbers.length - 1]);

    const rangeOfValues = range(min, max);
    if (rangeOfValues) return rangeOfValues;
  }
  console.log("data");

  //  its normal string
  return [];
};

export default bracketExpression;
