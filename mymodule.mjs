
export default class MyClass{ 
    constructor(req, res){ 
        this.res = res;
        this.req = req;
    }

    render() { 
        this.res.send({id:1, name:"MyClass", pic:"image.png"})
    }
}

export const myVar = 5;