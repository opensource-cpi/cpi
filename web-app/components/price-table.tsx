"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

type FoodType =
  | "add_on"
  | "drink"
  | "side"
  | "entree"
  | "appetizer"
  | "dessert";

type FoodItem = {
  food_id: number;
  food_name: string;
  restaurant: string;
  type: FoodType;
};

type PriceRecord = {
  food: FoodItem;
  weeklyPrices: { ds: string; price: number }[];
};

const generateFoodPriceData = (): PriceRecord[] => {
  return [
    {
      food: {
        food_id: 1,
        food_name: "Carne Asada",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 14.1 },
        { ds: "2025-10-06", price: 14.1 },
      ],
    },
    {
      food: {
        food_id: 2,
        food_name: "Chicken",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 10.95 },
        { ds: "2025-10-06", price: 10.95 },
      ],
    },
    {
      food: {
        food_id: 3,
        food_name: "Steak",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 12.7 },
        { ds: "2025-10-06", price: 12.7 },
      ],
    },
    {
      food: {
        food_id: 4,
        food_name: "Beef Barbacoa",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 12.7 },
        { ds: "2025-10-06", price: 12.7 },
      ],
    },
    {
      food: {
        food_id: 5,
        food_name: "Carnitas",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 11.7 },
        { ds: "2025-10-06", price: 11.7 },
      ],
    },
    {
      food: {
        food_id: 6,
        food_name: "Sofritas",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 10.95 },
        { ds: "2025-10-06", price: 10.95 },
      ],
    },
    {
      food: {
        food_id: 7,
        food_name: "Veggie",
        restaurant: "Chipotle",
        type: "entree",
      },
      weeklyPrices: [
        { ds: "2025-09-29", price: 10.95 },
        { ds: "2025-10-06", price: 10.95 },
      ],
    },
  ];
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export function PriceTable() {
  const [data] = useState(generateFoodPriceData());
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedType, setSelectedType] = useState<FoodType | "all">("all");

  const weeks = useMemo(() => {
    if (data.length === 0) return [];
    return data[0].weeklyPrices.map((p) => p.ds);
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedType === "all") return data;
    return data.filter((record) => record.food.type === selectedType);
  }, [data, selectedType]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    if (!sortConfig) return sorted;

    return sorted.sort((a, b) => {
      if (sortConfig.key === "food_name") {
        return sortConfig.direction === "asc"
          ? a.food.food_name.localeCompare(b.food.food_name)
          : b.food.food_name.localeCompare(a.food.food_name);
      }
      if (sortConfig.key === "restaurant") {
        return sortConfig.direction === "asc"
          ? a.food.restaurant.localeCompare(b.food.restaurant)
          : b.food.restaurant.localeCompare(a.food.restaurant);
      }
      if (sortConfig.key === "type") {
        return sortConfig.direction === "asc"
          ? a.food.type.localeCompare(b.food.type)
          : b.food.type.localeCompare(a.food.type);
      }

      // Sort by week price
      const weekIndex = weeks.indexOf(sortConfig.key);
      if (weekIndex !== -1) {
        const aPrice = a.weeklyPrices[weekIndex].price;
        const bPrice = b.weeklyPrices[weekIndex].price;
        return sortConfig.direction === "asc"
          ? aPrice - bPrice
          : bPrice - aPrice;
      }

      return 0;
    });
  }, [filteredData, sortConfig, weeks]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const getPriceColor = (price: number) => {
    if (price < 3) return "text-green-600";
    if (price < 6) return "text-blue-600";
    if (price < 9) return "text-orange-600";
    return "text-red-600";
  };

  const getTypeColor = (type: FoodType) => {
    const colors: Record<FoodType, string> = {
      entree: "bg-blue-100 text-blue-700 border-blue-300",
      side: "bg-green-100 text-green-700 border-green-300",
      drink: "bg-purple-100 text-purple-700 border-purple-300",
      appetizer: "bg-orange-100 text-orange-700 border-orange-300",
      dessert: "bg-pink-100 text-pink-700 border-pink-300",
      add_on: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[type];
  };

  const SortButton = ({
    columnKey,
    label,
  }: {
    columnKey: string;
    label: string;
  }) => {
    const isActive = sortConfig?.key === columnKey;
    const direction = sortConfig?.direction;

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSort(columnKey)}
        className="h-auto p-0 hover:bg-accent font-semibold text-xs"
      >
        <span className={isActive ? "text-primary" : "text-foreground"}>
          {label}
        </span>
        {isActive && (
          <span className="ml-1 text-primary">
            {direction === "asc" ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </span>
        )}
      </Button>
    );
  };

  const formatDate = (ds: string) => {
    const date = new Date(ds);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const groupedData = useMemo(() => {
    const groups: { restaurant: string; items: typeof sortedData }[] = [];
    let currentRestaurant = "";

    sortedData.forEach((record) => {
      if (record.food.restaurant !== currentRestaurant) {
        currentRestaurant = record.food.restaurant;
        groups.push({ restaurant: currentRestaurant, items: [] });
      }
      groups[groups.length - 1].items.push(record);
    });

    return groups;
  }, [sortedData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-foreground">
          Filter by type:
        </span>
        <Button
          variant={selectedType === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedType("all")}
        >
          All
        </Button>
        {(
          [
            "entree",
            "side",
            "drink",
            "appetizer",
            "dessert",
            "add_on",
          ] as FoodType[]
        ).map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(type)}
            className="capitalize"
          >
            {type.replace("_", " ")}
          </Button>
        ))}
      </div>

      <Card className="bg-card border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="sticky left-0 z-20 bg-muted/50 backdrop-blur-sm px-4 py-3 text-left border-r border-border">
                    <SortButton columnKey="restaurant" label="Restaurant" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortButton columnKey="food_name" label="Food Item" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortButton columnKey="type" label="Type" />
                  </th>
                  {weeks.map((week) => (
                    <th
                      key={week}
                      className="px-4 py-3 text-left whitespace-nowrap"
                    >
                      <SortButton columnKey={week} label={formatDate(week)} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card">
                {groupedData.map((group) =>
                  group.items.map((record, itemIdx) => (
                    <tr
                      key={record.food.food_id}
                      className={`hover:bg-muted/30 transition-colors ${
                        itemIdx === group.items.length - 1
                          ? "border-b-2 border-border"
                          : "border-b border-border/50"
                      }`}
                    >
                      {itemIdx === 0 && (
                        <td
                          rowSpan={group.items.length}
                          className="sticky left-0 z-10 bg-card backdrop-blur-sm px-4 py-3 font-medium text-foreground border-r border-border whitespace-nowrap align-middle text-center"
                        >
                          {record.food.restaurant}
                        </td>
                      )}
                      <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">
                        {record.food.food_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={`capitalize text-xs ${getTypeColor(
                            record.food.type
                          )}`}
                        >
                          {record.food.type.replace("_", " ")}
                        </Badge>
                      </td>
                      {record.weeklyPrices.map((priceData, idx) => (
                        <td
                          key={idx}
                          className={`px-4 py-3 font-mono text-sm whitespace-nowrap font-semibold ${getPriceColor(
                            priceData.price
                          )}`}
                        >
                          ${priceData.price.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono">
                Total Items: {sortedData.length}
              </span>
              <span className="font-mono">Weeks Tracked: {weeks.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium">Price Range:</span>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-mono text-xs font-semibold">
                  {"<$3"}
                </span>
                <span className="text-blue-600 font-mono text-xs font-semibold">
                  $3-6
                </span>
                <span className="text-orange-600 font-mono text-xs font-semibold">
                  $6-9
                </span>
                <span className="text-red-600 font-mono text-xs font-semibold">
                  {"$9+"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
