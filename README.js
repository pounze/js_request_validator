var sample = {
  name:{
    required:true,
    datatype:"string",
    datatypeMsg:"name must be string",
    msg:"Name cannot be empty"
  },
  email:{
    required:true,
    datatype:"string",
    msg:"Email address cannot be empty",
    datatypeMsg:"email must be string",
    regexMsg:"Invalid email address",
    regex:"\\S+@\\S+\\.\\S+"
  },
  skills:{
    isArray:true,
    datatype:"string",
    required:true,
    datatypeMsg:"skills must be string",
    msg:"Skills cannot be empty"
  },
  companies:{
    isArray:true,
    required:true,
    msg:"Companies cannot be empty",
    name:{
      datatype:"string",
      required:true,
      datatypeMsg:"companies name must be string",
      msg:"Skills cannot be empty"
    }
  },
  hobbies:{
    major:{
      skills:{
        isArray:true,
        datatype:"string",
        required:true,
        datatypeMsg:"major skills datatype must be string",
        msg:"Skills cannot be empty"
      }
    }
  },
  shobbies:{
    major:{
      skills:{
        isArray:true,
        datatype:"string",
        required:true,
        datatypeMsg:"stobbies skills datatype must be string",
        msg:"stobbies skills cannot be empty"
      }
    }
  }
};

var object = {
  name:"Sudeep",
  email:"sudeep.ignition@gmail.com",
  skills:[
    "php",
    "Nodejs"
  ],
  companies:[
    {
      name:"Religare"
    },
    {
      name:"FourBrick"
    }
  ]
  ,
  hobbies:{
    major:{
      skills:[
        "Golang"
      ]
    }
  },
  shobbies:{
    major:{
      skills:[
        "Golang"
      ]
    }
  }

};

var returnalues = Parser(object,sample,{},[]);

if(!returnalues.status)
{
  console.log(returnalues.errors);
}
