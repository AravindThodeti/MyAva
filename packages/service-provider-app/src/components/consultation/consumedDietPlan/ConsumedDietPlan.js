import * as React from "react";
import { useParams } from "react-router-dom";
import { getConsultationDetail,getConsumedDiet } from "utils/ApiUtils";
import DateFnsUtils from '@date-io/date-fns';
import {makeStyles } from "@material-ui/core/styles";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { toDate } from "date-fns";
import ConsumedDietPlanTable from "./ConsumedDietPlanTable";

const useStyles = makeStyles({
    alignDates:{
        display:"flex",
        justifyContent: "space-between",
        fontFamily:"'Poppins', sans-serif",
    },
    dFlexSpaceBtwn:{
        display: "flex",
        justifyContent: "space-around",
        "& p":{
            paddingLeft:"10px" ,
            fontFamily:"'Poppins', sans-serif",
        }
    }
    
  });

export default function ConsumedDietPlan() {
    const classes = useStyles();
    let { id } = useParams();
    const consultationId = id;
    const [value, setValue] = React.useState(0);
    const [consultation, setConsultation] = React.useState(null);
    const [userProgramId,setUserProgramId] = React.useState(null);
    const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
    const [selectedToDate, setSelectedToDate] = React.useState(new Date());
    const [consumedDietResult , setConsumedDietResult] = React.useState(null);

   const simplifyDate =(date) =>{
       let simpleDate = (date.getFullYear()+"-"+(Number(date.getMonth())+1)+"-"+date.getDate()).toString();
        return  simpleDate;
    };

    const handleFromDateChange = (date) => {
        setSelectedFromDate(date)
  }
  const handleToDateChange = (date) => {
    setSelectedToDate(date)
}

const dietPlanIndications =[ 
    {
        name:"Prescribed plan",
        imgUrl:"/assets/images/dietIndications/prescribed.svg"
    },
    {
        name:"As per diet plan",
        imgUrl:"/assets/images/dietIndications/asPerPrescribed.svg"
    },
    {
        name:"Not in diet plan",
        imgUrl:"/assets/images/dietIndications/notInDiet.svg"
    }
]

    React.useEffect(() => {
      getConsultationDetail(consultationId).then((res) => {
        setConsultation(res);
        setUserProgramId(res?.user_program_id);       
      console.log("consultation",res);
      }
      );  
    }, [consultationId]);

    React.useEffect(() =>{
        if(userProgramId!=null && selectedFromDate && selectedToDate){
        getConsumedDiet(userProgramId,simplifyDate(selectedFromDate),simplifyDate(selectedToDate)).then((res) => setConsumedDietResult(res))
        }
    },[userProgramId,selectedFromDate,selectedToDate])
    return(<div>
        <div className={classes.dFlexSpaceBtwn}>
            {dietPlanIndications.map((dietPlan) =>(
                <span className={classes.dFlexSpaceBtwn}><img src={dietPlan.imgUrl}></img><p>{dietPlan.name}</p></span>
               
            ))}
        </div>
       <div className={classes.alignDates}>
        <span><h2>Diet Consumed</h2></span>
        <span className={classes.alignDates}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        disableFuture
                        id="date-picker-dialog"
                        views={["date", "month"]}
                        openTo="date"
                        format="dd-MMM-yyyy"
                        margin="normal"
                        label="From date"
                        value={selectedFromDate}
                        onChange={handleFromDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </Grid>
                    <Grid>
                    <KeyboardDatePicker
                        disableToolbar
                        disableFuture
                        views={["date", "month"]}
                        openTo="date"
                        format="dd-MMM-yyyy"
                        margin="normal"
                        id="date-picker-dialog"
                        label="To date"
                        value={selectedToDate}
                        onChange={handleToDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            </span>
            </div>
            {consumedDietResult!=null && (
                 <ConsumedDietPlanTable dietPlanResult={consumedDietResult}/>
            )}
    
    </div>)

}