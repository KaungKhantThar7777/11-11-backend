import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class PatientResolver {
  @Query(() => String)
  helloWorld() {
    return 'hello world';
  }
}
