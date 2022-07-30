## Switching between stacks

https://reactnavigation.org/docs/nesting-navigators/#passing-params-to-a-screen-in-a-nested-navigator

#### Getting stuck in stack without the initial route

https://reactnavigation.org/docs/nesting-navigators/#rendering-initial-route-defined-in-the-navigator

## Hacks

### Avoid navigation getting stuck by changing the read only params on blur

```typescript
useFocusEffect(
  useCallback(() => {
    // Refresh variables on focus

    return () => {
      // Reset params to initial state, because when navigating using the parent navigator new params are not passed and goBackOnCreate will remain true forever
      route.params = { goBackOnCreate: false };

      // Refresh variables on blur, reset form state
    };
  }, [])
);
```
