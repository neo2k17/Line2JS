const LineConnect = require('./connect');
let LINE = require('./main.js');

const auth = {
	authToken: 'EmvkKOQV8H5rlKOIC2H3.TuhWCdVJO8kABaxppixWCW.qNCgwbr7met6CurUr+hMAB3DLdYWm5k/NZCYspOj/mk=',
	certificate: 'e7396141a024ee24d8780e0060af0c4e4e072027f132107ddc1b3820c6eae53f',
}
let client =  new LineConnect(auth);
//let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
