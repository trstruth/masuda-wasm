use wasm_bindgen::prelude::*;

use js_sys::Array;

use masuda::generators::LinearCongruential;
use masuda::pokemon::Pokemon;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Game {
    lcrng: LinearCongruential,
}

#[wasm_bindgen]
pub struct Frame {
    pub pid: u32,
    pub hp: u8,
    pub atk: u8,
    pub def: u8,
    pub spa: u8,
    pub spd: u8,
    pub spe: u8,
    pub nature: u8,
    pub ability: u8,
    pub gender: u8,
}

impl From<Pokemon> for Frame {
    fn from(p: Pokemon) -> Self {
        Frame{
            pid: p.pid,
            hp: p.ivs.hp as u8,
            atk: p.ivs.atk,
            def: p.ivs.def,
            spa: p.ivs.spa,
            spd: p.ivs.spd,
            spe: p.ivs.spe,
            nature: p.get_nature() as u8,
            ability: p.get_ability(),
            gender: p.get_ability(),
        }
    }
}

#[wasm_bindgen]
impl Game {
    pub fn new(initial_seed: u32) -> Self {
        Game{
            lcrng: LinearCongruential::new(initial_seed),
        }
    }

    pub fn method_1(&mut self) -> Frame {
        Frame::from(self.lcrng.method_1())
    }

    pub fn method_2(&mut self) -> Frame {
        Frame::from(self.lcrng.method_2())
    }

    pub fn method_4(&mut self) -> Frame {
        Frame::from(self.lcrng.method_4())
    }

    pub fn get_frames(&mut self, n: u32, method: &str) -> Array {
        let mut v = Vec::new();
        for _ in 0..n {
            let frame = match method {
                "1" => self.method_1(),
                "2" => self.method_2(),
                "4" => self.method_4(),
                _ => panic!(format!("Unsupported method: {}", method)),
            };
            v.push(frame)
        } 

        v.into_iter().map(JsValue::from).collect()
    }
}
