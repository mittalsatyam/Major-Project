const queue=require('../config/kue');
const commentsMailer=require('../mailers/comments_mailer');
queue.process('email',function(job,done){
 console.log('email worker is processing the job');
 commentsMailer.newComment(job.data);
 done();
});