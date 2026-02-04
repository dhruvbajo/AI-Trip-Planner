"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type TripDurationUiProps = {
  onSelectedOption: (value: string) => void;
};

function TripDurationUi({ onSelectedOption }: TripDurationUiProps) {
  const [days, setDays] = useState(3);

  const increment = () => setDays((d) => d + 1);
  const decrement = () => setDays((d) => (d > 1 ? d - 1 : 1));

  return (
    <div className="mt-4 p-4 rounded-xl bg-white border text-center w-full max-w-sm">
      <h3 className="font-semibold text-lg mb-4">
        How many days do you want to travel?
      </h3>

      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={decrement}
          className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold"
        >
          −
        </button>

        <span className="text-xl font-semibold">{days} Days</span>

        <button
          onClick={increment}
          className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold"
        >
          +
        </button>
      </div>

      <Button
        className="bg-primary hover:bg-primary-600 text-white px-6"
        onClick={() => onSelectedOption(`${days} days`)}
      >
        Confirm
      </Button>
    </div>
  );
}

export default TripDurationUi;
