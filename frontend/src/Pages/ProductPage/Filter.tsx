import { useState } from "react";
import { Label } from "@/components/Ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/Ui/radio-group";
import { Slider } from "@/components/Ui/slider";
import { Checkbox } from "@/components/Ui/checkbox";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  animal: string;
  seasons: string[];
  price: number[];
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [animal, setAnimal] = useState<string>("all");
  const [seasons, setSeasons] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 10000]);

  const handleAnimalChange = (value: string) => {
    setAnimal(value);
    onFilterChange({ animal: value, seasons, price });
  };

  const handleSeasonChange = (season: string) => {
    const updatedSeasons = seasons.includes(season)
      ? seasons.filter((s) => s !== season)
      : [...seasons, season];
    setSeasons(updatedSeasons);
    onFilterChange({ animal, seasons: updatedSeasons, price });
  };

  const handlePriceChange = (newPrice: number[]) => {
    setPrice(newPrice);
    onFilterChange({ animal, seasons, price: newPrice });
  };

  return (
    <div className="sidebar w-full md:w-[20vw] md:h-screen border-r-2">
      <div className="p-2 font-leag sticky">
        <h1 className="text-xl py-4 font-bold">Filter</h1>
        <div className="w-fit p-2">
          <RadioGroup value={animal} onValueChange={handleAnimalChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dogs" id="dogs" />
              <Label htmlFor="dogs">Dogs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cats" id="cats" />
              <Label htmlFor="cats">Cats</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="birds" id="birds" />
              <Label htmlFor="birds">Birds</Label>
            </div>
          </RadioGroup>
        </div>
        <h1 className="text-lg">Seasons</h1>
        <div className="flex flex-col p-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="winter"
              checked={seasons.includes("winter")}
              onCheckedChange={() => handleSeasonChange("winter")}
            />
            <Label htmlFor="winter">Winter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="summer"
              checked={seasons.includes("summer")}
              onCheckedChange={() => handleSeasonChange("summer")}
            />
            <Label htmlFor="summer">Summer</Label>
          </div>
        </div>
        <h1 className="text-lg">Price</h1>
        <div className="p-2 font-leag">
          <div className="flex justify-between"><span>{price[0]}$</span><span>10000$</span></div>
          <Slider value={price} onValueChange={handlePriceChange} max={10000} />
        </div>
      </div>
    </div>
  );
}
