import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, Plus, Filter, Download } from "lucide-react";

export function ScreeningDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Resume Screening</h1>
        <p className="text-lg text-slate-600">AI-powered candidate ranking and evaluation</p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Job
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Job Cards */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Senior Software Engineer</CardTitle>
                  <CardDescription>San Francisco, CA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-2">Must-have Skills</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Python</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">AWS</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-slate-600">12 candidates</span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Resume
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Pool</CardTitle>
              <CardDescription>All uploaded resumes and candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample Candidate List */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Candidate {i}</p>
                      <p className="text-sm text-slate-600">candidate{i}@example.com</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search rankings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Rankings</CardTitle>
              <CardDescription>Ranked by match score for selected job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Rank</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Candidate</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Score</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Match</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-900 font-medium">#{i}</td>
                        <td className="py-3 px-4 text-slate-900">Candidate {i}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                                style={{ width: `${85 - i * 5}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-900">{85 - i * 5}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={i <= 2 ? "default" : i <= 3 ? "secondary" : "outline"}>
                            {i <= 2 ? "Excellent" : i <= 3 ? "Good" : "Fair"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={i <= 2 ? "default" : "outline"}>
                            {i <= 2 ? "Shortlisted" : "Pending"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
