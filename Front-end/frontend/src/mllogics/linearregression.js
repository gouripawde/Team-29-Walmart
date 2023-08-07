import regression from "regression";

export const doRegression=(data)=>{
    const data55=data.map((item,key)=>{
        return [key+1,item];
    })
    // console.log(data55);
    // training regression model
    const regressionModel= regression.linear(data55);
    const predictions=[];
    for(let i=0;i<12;i++){
        predictions.push(regressionModel.predict(i));
    }
    return predictions;
}

