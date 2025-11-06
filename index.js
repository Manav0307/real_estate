import express from 'express'
const app = express();
import mysql from 'mysql2'
app.set("view engine","ejs");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'estate',
    password: 'Manav@0306',
})


app.listen(8080, ()=>{
    console.log(`port 8080 is listening`);
})

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/apartment",(req,res)=>{
    let q1 = `SELECT appartment_flats.Ap_ID, Flat_ID,Appartment_address, Ap_city, Ap_area, Block, Floor, Bedrooms, Flat_area, 
Balcony_area, Bedroom_area, Hall_area, Agent_id
FROM appartment_flats JOIN appartment_details
ON appartment_flats.Ap_ID = appartment_details.Ap_ID;`

try{
    connection.query(q1, (err,aparts)=>{
        if(err) throw err;
        res.render("apartments.ejs",{aparts});
    });
} catch(err){
    console.log(err);
    res.send("Some error in DB");
}
})

app.get("/complex",(req,res)=>{
    let q2 = `SELECT complex_unit.Co_ID, Unit_ID, Constructor_ID, Co_name, Co_address, Constructor, Num_Units_Available, complex_unit.Unit_area,
Unit_Block, Unit_cost, Unit_status, Constructor_Name, Construction_Year, Co_area, Parking_area, Blocks, Floors
FROM complex_unit JOIN complex_details
ON complex_unit.Co_ID = complex_details.Co_ID
JOIN complex_construction ON complex_construction.Co_ID = complex_details.Co_ID;`

try{
    connection.query(q2, (err,coms)=>{
        if(err) throw err;
        console.log("Complex data length:", coms.length);
        console.log("Sample row:", coms[0]);
        res.render("complexes.ejs",{coms});
    });
} catch(err){
    console.log(err);
    res.send("Some error in DB");
}
})


app.get("/plot",(req,res)=>{
    let q3 = `SELECT plot_details.P_id, dimension_id, P_address, P_price, P_status, Listed_date, area_sqft, facing_direction, P_length,
P_breadth, road_width_ft, D_From_Highway, D_From_Hospital, D_From_Mall, Neighbour, Agent_id
FROM plot_details JOIN plot_dimension
ON plot_details.P_ID = plot_dimension.plot_ID
JOIN plot_facilities ON plot_details.P_ID = plot_facilities.P_ID;`

try{
    connection.query(q3, (err,plos)=>{
        if(err) throw err;
        res.render("plotss.ejs",{plos});
    });
} catch(err){
    console.log(err);
    res.send("Some error in DB");
}
})

app.get("/employee",(req,res)=>{
    let q4 = `SELECT * FROM employee;`

try{
    connection.query(q4, (err,emps)=>{
        if(err) throw err;
        res.render("employeess.ejs",{emps});
    });
} catch(err){
    console.log(err);
    res.send("Some error in DB");
}
})

app.get("/agent",(req,res)=>{
    let q5 = `SELECT * FROM agent;`

try{
    connection.query(q5, (err,ags)=>{
        if(err) throw err;
        res.render("agents.ejs",{ags});
    });
} catch(err){
    console.log(err);
    res.send("Some error in DB");
}
})

app.get("/company",(req,res)=>{
    let q6 = `SELECT * FROM office_details;`

try{
    connection.query(q6, (err,comps)=>{
        if(err) throw err;
        res.render("companys.ejs",{comps});
    });
} catch(err){
    console.log(err);
    res.send("Some error in DB");
}
})

// app.get("/agent",(req,res)=>{
//     res.send("You are seeing agent link");
// })