#### Milestone - Deployment (Monitoring_App)

In this MILESTONE, we will extend our deployment pipeline to support deployment to real machine, and using a canary release strategy.

#### Properties

##### Task 1 - The ability to configure a deployment environment automatically, using a configuration management tool, such as ansible, or configured using vagrant/docker.

For task 1, 
  - To meet this requirement, we have used ansible.
  - Using ansible playbook, we have done required basic configuration of deployment environment. Our playbook looks like this -

```

```

In this playbook, we have defined a task which will install basic git, node, npm and node based on the list of hosts given to it.

To give all the necessary hosts to this playbook, we created a inventory file which has the list of our nodes (ec2 instances).

Thus the configuration task is done

##### Task 2 - The ability to deploy a self-contained/built application to the deployment environment. That is, this action should occur after a build step in your pipeline.

For Task 2,
  - We used Jenkins.
  - In jenkins, we created a new job to perfrom the build operation. In the build action, we wrote shell script to perform necessary installation, export the built artifacts to remote machine and perform 'npm install' to install all the required dependencies. 
  - Then using 'ssh' command we logged into the remote machine.
  - On one of the remote machine, we executed our app and on the other remote machine, we executed proxy.

##### Task 3 - The deployment must occur on an actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.

For Task 3, 
  - As a basic configuration, we have created 3 ec2 instances, two of which will work as app and the third as proxy.
  - Use of two 2 ec2 instances is significant to demonstrate canary release.

##### Task 4 - The ability to perform a canary release.

For Task 4,
  - We used Jenkins.
  - In jenkins, we created a new job to perform the canary release. In the build action, we wrote shell script to perform necessary installation, export the built artifacts to remote machine and perform 'npm install' to install all the required dependencies only one of the machines (as it is a canary release). 
  - Then using 'ssh' command we logged into the remote machine.
  - On one of the remote machine, we executed our app and on the other remote machine, we executed proxy.

The ability to monitor the deployed application for alerts/failures (using at least 2 metrics).
