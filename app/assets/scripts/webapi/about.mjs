// zugeer l bagiin medeelel sendleh class
export default class aboutTeam{ 
    constructor(req, res){ 
        this.res = res;
        this.req = req;
    }
    render() { 
        this.res.send({id:1, teamName:"Team Numunity", pic:"./app/assets/images/logo.png"})
    }
}

export const teamMember = 3;