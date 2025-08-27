#Prisma

Tanapat Nunkhong
## Required
- Git
- docker & DockerCompose
- PostgreSQL
- Node.js
- Prisma
- VSCode
    - PostgreSQL extensions (Chris Kolkman)
- typescript
- vitest
## Running
### Database
```
docker compose up -d
```
### Schema
```
npx prisma generate
npx prisma studio
```

## Develop
```First time
npx prisma init --datasource-provider postgresql
npx prisma generate
npx prisma db push
```

### Update schema
1. Update some schema
2. Run this command `npx prisma generate`
   - 2.1 `npx prisma studio` ชื่อตารางเปลี่ยน แต่ popup ผิดพลาด
   - 2.2 connect db ชื่อตารางยั่งไม่ถูกเปลียน
3. Run this command `npx prisma db push`
    - 3.1 `npx prisma studio` ชื่อตารางเปลียน แต่ไม่ขึ้น error
    - 3.2 connect db ชื่อตารางเปลี่ยนเป็นข้อมูลล่าสุด

### Nomal
```bash
npx pisma generate
```
### hono
```bash
npx tsc
node dist/server.js
```