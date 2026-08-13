import { interviewGraph } from './interviewAgent';
import { StateGraph } from "@langchain/langgraph";

describe('interviewGraph', () => {
  it('should be a compiled StateGraph', () => {
    // Check that interviewGraph is compiled, typically implies it has certain properties
    expect(interviewGraph).toBeDefined();
    // In compiled langgraph, invoke method is available
    expect(typeof interviewGraph.invoke).toBe('function');
  });
});
