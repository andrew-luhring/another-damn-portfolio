# Require's Cascade

```
main 
|=> _init             [mocha, chai]
    |=> init          [jquery]
    |=> _script       [mocha, chai]
        |=> script    [angular]
          |=> done    [mocha]
        
        
```