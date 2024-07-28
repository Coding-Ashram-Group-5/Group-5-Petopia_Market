import { useState } from "react";
import { Label } from "@/components/Ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/Ui/radio-group";
import { Checkbox } from "@/components/Ui/checkbox";
import { Toggle } from "@/components/Ui/toggle";
import * as Slider from '@radix-ui/react-slider';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  animal: string;
  seasons: string[];
  price: number[];
  tags?: string[];
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [animal, setAnimal] = useState<string>("all");
  const [seasons, setSeasons] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 5000]);
  const [tags, setTags] = useState<string[]>([]);

  const handleAnimalChange = (value: string) => {
    setAnimal(value);
    onFilterChange({ animal: value, seasons, price, tags });
  };

  const handleSeasonChange = (season: string) => {
    const updatedSeasons = seasons.includes(season)
      ? seasons.filter((s) => s !== season)
      : [...seasons, season];
    setSeasons(updatedSeasons);
    onFilterChange({ animal, seasons: updatedSeasons, price, tags });
  };

  const handlePriceChange = (newPrice: number[]) => {
    setPrice(newPrice);
    onFilterChange({ animal, seasons, price: newPrice, tags });
  };

  const handleTagToggle = (tag: string) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(updatedTags);
    onFilterChange({ animal, seasons, price, tags: updatedTags });
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
              <RadioGroupItem value="Dog" id="Dog" />
              <Label htmlFor="Dog">Dogs</Label>
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
          <div className="flex justify-between"><span>{price[0]}₹</span><span>{price[1]}₹</span></div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={price}
            onValueChange={handlePriceChange}
            min={0}
            max={5000}
            step={100}
            aria-label="Price"
          >
            <Slider.Track className="bg-red-200 relative flex-grow rounded-full h-1">
              <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-red-500 rounded-full shadow" />
            <Slider.Thumb className="block w-5 h-5 bg-red-500 rounded-full shadow" />
          </Slider.Root>
        </div>
        <h1 className="text-lg">Tags</h1>
        <div className="my-2 flex gap-2 w-full flex-wrap overflow-clip">
          {["food", "toy", "accessories", "medicine", "grooming"].map((tag, index) => (
            <Toggle
              key={index}
              variant="outline"
              aria-label={`Toggle ${tag}`}
              pressed={tags.includes(tag)}
              onClick={() => handleTagToggle(tag)}
            >
              <h1>{tag}</h1>
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}
