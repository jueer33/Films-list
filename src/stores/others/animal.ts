import { defineStore } from "pinia";

export const useAnimal = defineStore('animals', {
    state: () => ({
        animals: [
            { url: "https://vcg00.cfp.cn/creative/vcg/800/new/VCG41N1286022485.jpg" },
        ]
    }),
});
