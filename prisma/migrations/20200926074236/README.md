# Migration `20200926074236`

This migration has been generated by Codevski at 9/26/2020, 5:42:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200926073835..20200926074236
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -27,9 +27,9 @@
   alt_names   String?
   covers      String?
   artist      String?
   author      String?
-  Chapter     Chapter[]
+  chapters    Chapter[]
 }
 model Chapter {
   id      String  @id
```


