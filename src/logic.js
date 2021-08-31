const source = {"Items":[{"projectId":"com.ordering.chipotle","launchTime":[{"recordedTime":1628796445396,"value":1.2},{"recordedTime":1628759565635,"value":1.1}]}],"Count":1,"ScannedCount":1}
const data = source.Items[0];
console.log('data: ', data);

data.launchTime = data.launchTime.sort((a,b) => (a.recordedTime > b.recordedTime) ? 1 : -1)
let launchTimes = data.launchTime.map((item) => { return item.value});
let recordedTime = data.launchTime.map((item) => {return item.recordedTime});