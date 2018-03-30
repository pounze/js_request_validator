function Parser(object,sample,returnValue,errors)
{
  try
  {
    /*
      Version Sample 1.0.0
      this does not have condition parser may be in next version
    */

    // iterating over object

    for(var key in object)
    {
      // checking for schema match

      if(typeof(sample[key]) == 'undefined')
      {
        return {status:false,msg:'Scheme does not match',node:key};
      }
    }

    // if schema is matched successfully

    for(var key in sample)
    {
      // checking if object has same keyname as sample macther if not schema is not matched

      if(typeof(object[key]) != 'undefined')
      {
        // checking if its not array

        if(!Array.isArray(object[key]))
        {
          // checking if having own child
          if(object.hasOwnProperty(key) && typeof(object[key]) == 'object')
          {
            // if having then recursion call and start all over again
            Parser(object[key],sample[key],returnValue,errors);
          }
          else
          {
            // check for data type
            if(typeof(object[key]) != sample[key]["datatype"])
            {
              errors.push({status:false,msg:sample[key]["datatypeMsg"]});
            }

            // check for required filed

            if(sample[key]["required"] == true && (typeof(object[key]) == 'undefined' || object[key] == null || object[key] == ""))
            {
              errors.push({status:false,msg:sample[key]["msg"]});
            }

            // check for regular expression match

            if(typeof(sample[key]["regex"]) != 'undefined')
            {
              var regexString = new RegExp(sample[key]["regex"]);
              if(!object[key].match(regexString))
              {
                errors.push({status:false,msg:sample[key]["regexMsg"]});
              }
            }
          }
        }
        else
        {
          // if array

          // check for array empty
          if(typeof(sample[key]["isArray"]) != 'undefined' && sample[key]["isArray"] == true && object[key].length == 0)
          {
            errors.push({status:false,msg:sample[key]["msg"]});
          }

          for(var index in object[key])
          {
            // iterating with array

            if(typeof(object[key][index]) == 'object')
            {

              // if object

              for(var innerKey in object[key][index])
              {

                //iterating inside object of array

                // match datatype

                if(typeof(object[key][index][innerKey]) != sample[key][innerKey]["datatype"])
                {
                  errors.push({status:false,msg:sample[key][innerKey]["datatypeMsg"]});
                }

                // match for required fields

                if(sample[key][innerKey]["required"] == true && (typeof(object[key][index][innerKey]) == 'undefined' || object[key][index][innerKey] == null || object[key][index][innerKey] == ""))
                {
                  errors.push({status:false,msg:sample[key][innerKey]["msg"]});
                }

                // match regular expression

                if(typeof(sample[key][innerKey]["regex"]) != 'undefined')
                {
                  var regexString = new RegExp(sample[key][innerKey]["regex"]);
                  if(!object[key][index][innerKey].match(regexString))
                  {
                    errors.push({status:false,msg:sample[key][innerKey]["regexMsg"]});
                  }
                }
              }
            }
            else
            {

              // check if its has property recursive call again
              if(sample.hasOwnProperty(key) && typeof(object[key][index]) == 'object')
              {
                Parser(object[key],sample[key],returnValue,errors);
              }
              else
              {
                // match for datatype

                if(typeof(object[key][index]) != sample[key]["datatype"])
                {
                  errors.push({status:false,msg:sample[key]["datatypeMsg"]});
                }

                // match for required fields

                if(sample[key]["required"] == true && (typeof(object[key][index]) == 'undefined' || object[key][index] == null || object[key][index] == ""))
                {
                  errors.push({status:false,msg:sample[key]["msg"]});
                }

                // match for regular expression

                if(typeof(sample[key]["regex"]) != 'undefined')
                {
                  var regexString = new RegExp(sample[key]["regex"]);
                  if(!object[key][index].match(regexString))
                  {
                    errors.push({status:false,msg:sample[key]["regexMsg"]});
                  }
                }
              }
            }
          }
        }
      }
      else
      {
        return {status:false,msg:'Scheme does not match',node:key};
      }
    }

    // checking for errors length

    if(errors.length > 0)
    {
      return {status:false,errors:errors};
    }
    else
    {
      return {status:true};
    }
  }
  catch(e)
  {
    return e;
  }
}

exports.Parser = Parser;