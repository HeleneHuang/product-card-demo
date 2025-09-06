import { useState } from "react";
import List from "../../components/List/List";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { demoProducts } from "../../data/products";
import { AnimatePresence, motion } from 'framer-motion'

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(demoProducts.map((p) => p.cat)));

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Field>
                <Label className="block mb-2 font-medium text-gray-700 text-5xl">
                    All Products
                </Label>
                <div className="flex gap-3 mt-6 text-xl cursor-pointer">
                    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                        {({ open }) => (
                            <>
                                <ListboxButton>{selectedCategory ?? "Select a category"}</ListboxButton>
                                <AnimatePresence>
                                    {open && (
                                        <ListboxOptions
                                            static
                                            as={motion.div}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            anchor="bottom"
                                            className="origin-top bg-white"
                                        >
                                            {categories.map((cat) => (
                                                <ListboxOption
                                                    key={cat}
                                                    value={cat}
                                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                                >
                                                    {cat}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </Listbox>


                </div>
            </Field>

            <List
                products={
                    selectedCategory
                        ? demoProducts.filter((p) => p.cat === selectedCategory)
                        : demoProducts
                }
            />
        </div>
    );
};


export default Products;