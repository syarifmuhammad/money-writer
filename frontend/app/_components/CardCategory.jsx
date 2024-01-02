import Link from 'next/link'
import { BiPencil, BiSolidTrash } from "react-icons/bi";
import { deleteData } from '@/app/_services/categories';

export default async function CardCategory({ category }) {
    return (
        <div className="flex items-center justify-between gap-y-2 bg-white p-4 shadow-md rounded-md">
            <p>{category.name}</p>
            <div className="flex gap-x-4">
                <Link href={`/categories/${category.id}`}>
                    <BiPencil className="text-2xl cursor-pointer text-blue-500" />
                </Link>
                <form className='flex items-center' action={deleteData}>
                    <button name="id" value={category.id}>
                        <BiSolidTrash className="text-2xl cursor-pointer text-red-500" />
                    </button>
                </form>
            </div>
        </div>
    )
}