# k6 loadtesting for nextcloud

K6 template repository for load and performance testing. Inspired by the amazing work done by the GitLab Team. [GitLab Performance Tool](https://gitlab.com/gitlab-org/quality/performance/-/blob/main/k6)

Example run:

```bash
TEST_USER_PREFIX=<PREFIX> TEST_USER_SALT=<SALT> TEST_USERS=1000 OPTIONS_FILE=config/options/300s100u.json ENVIRONMENT=<BASE_URL> k6 run ./loadtest/tests/api/file-interaction.js
```
