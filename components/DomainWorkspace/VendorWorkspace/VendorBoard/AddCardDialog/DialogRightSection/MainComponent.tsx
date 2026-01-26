import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentsTab } from "./CommentsTab";
import { TimelineTab } from "./TimelineTab";
import { ActivitiesTab } from "./ActivitiesTab";

export default function MainRightSection() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="comments" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b rounded-none h-12">
          <TabsTrigger
            value="comments"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none bg-transparent shadow-none">
            Comments
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none bg-transparent shadow-none">
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none bg-transparent shadow-none">
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="mt-6">
          <CommentsTab />
        </TabsContent>
        <TabsContent value="timeline" className="mt-6">
          <TimelineTab />
        </TabsContent>
        <TabsContent value="activities" className="mt-6">
          <ActivitiesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
