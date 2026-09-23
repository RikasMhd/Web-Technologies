const expressServer = require('express')
const employeeApi = require('./employee-api')

const port = 3000;
const app = expressServer();

app.use('/employee-api',employeeApi)

app.use(expressServer.urlencoded({extended: true}));
app.use(expressServer.json());


app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
})
