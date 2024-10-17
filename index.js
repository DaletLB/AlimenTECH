import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from 'mercadopago';
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1454902750436437-100921-35ce52fb5af6542fd23aecbb8e4ad02b-1006926004' });


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server");
});

app.post("/create_preference", async (req, res)=> {
    try{
        const body = {
            items: [
                { 
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "MXN",
            },
         ],
         back_urls: {
            success: "https://www.iztapalapa.tecnm.mx/",
            failure: "https://www.youtube.com/",
            pending: "https://www.facebook.com/?ref=homescreenpwa",
         },
         auto_return: "approved",
        };

     const preference = new Preference(client);   
     const result = await preference.create({body});
     res.json({
        id: result.id,
     });
    }catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Error al crear la preferecia"
        });
    }
});

app.listen(port, ()=>{
    console.log(`El servidor esta corrindo en el puerto ${port}`);
});