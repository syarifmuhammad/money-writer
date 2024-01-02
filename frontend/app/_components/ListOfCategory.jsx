// 'use client'

import CardCategory from "@/app/_components/CardCategory";

export default function ListOfCategory({ categories = [], handleRemove }) {
    return (
        <div className="flex flex-col gap-y-2">
            {categories.map((category, index) => (
                <CardCategory key={index} category={category} handleRemove={handleRemove} />
            ))}
        </div>
    )
}