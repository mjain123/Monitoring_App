#### Milestone - Deployment (Monitoring_App)

In this MILESTONE, we will extend our deployment pipeline to support deployment to real machine, and using a canary release strategy.

As a basic configuration for this milestone, we have created 3 ec2 instances of which two work as app and the third as proxy.

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


The ability to deploy a self-contained/built application to the deployment environment. That is, this action should occur after a build step in your pipeline.

The deployment must occur on an actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.

The ability to perform a canary release.

The ability to monitor the deployed application for alerts/failures (using at least 2 metrics).
