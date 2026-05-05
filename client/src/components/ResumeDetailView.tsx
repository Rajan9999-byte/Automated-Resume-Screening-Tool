import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download, X } from "lucide-react";

interface ResumeDetailViewProps {
  candidateName: string;
  candidateEmail?: string;
  score: number;
  decision: "shortlisted" | "rejected" | "pending";
  skills: string[];
  yearsExperience?: number;
  education: string[];
  gapFlags: string[];
  tfidfScore: number;
  semanticScore: number;
  mustHaveHits: number;
  mustHaveTotal: number;
  onClose?: () => void;
  onDownload?: () => void;
}

export function ResumeDetailView(props: ResumeDetailViewProps) {
  const {
    candidateName,
    candidateEmail,
    score,
    decision,
    skills,
    yearsExperience,
    education,
    gapFlags,
    tfidfScore,
    semanticScore,
    mustHaveHits,
    mustHaveTotal,
    onClose,
    onDownload,
  } = props;

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-600";
    if (s >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getDecisionColor = (d: string) => {
    switch (d) {
      case "shortlisted":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b">
          <div className="flex-1">
            <CardTitle className="text-2xl">{candidateName}</CardTitle>
            {candidateEmail && <CardDescription>{candidateEmail}</CardDescription>}
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Score Overview */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Overall Score</h3>
              <Badge className={getDecisionColor(decision)}>
                {decision === "shortlisted" ? "✓ Shortlisted" : decision === "rejected" ? "✗ Rejected" : "◐ Pending"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</div>
                <p className="text-sm text-slate-600 mt-1">Composite Score</p>
              </div>

              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(tfidfScore)}`}>{tfidfScore}%</div>
                <p className="text-sm text-slate-600 mt-1">Keyword Match</p>
              </div>

              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(semanticScore)}`}>{semanticScore}%</div>
                <p className="text-sm text-slate-600 mt-1">Semantic Match</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {mustHaveHits}/{mustHaveTotal}
                </div>
                <p className="text-sm text-slate-600 mt-1">Must-Have Skills</p>
              </div>
            </div>
          </div>

          {/* Gap Flags */}
          {gapFlags.length > 0 && (
            <div className="border-l-4 border-amber-400 bg-amber-50 p-4 rounded">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Missing Must-Have Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {gapFlags.map((gap) => (
                      <Badge key={gap} variant="outline" className="bg-amber-100 text-amber-900 border-amber-300">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Extracted Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-slate-600">No skills extracted</p>
              )}
            </div>
          </div>

          {/* Experience */}
          {yearsExperience !== undefined && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Experience</h4>
              <p className="text-slate-700">{yearsExperience} years of professional experience</p>
            </div>
          )}

          {/* Education */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Education</h4>
            {education.length > 0 ? (
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700">
                    <div className="h-2 w-2 bg-slate-400 rounded-full" />
                    {edu}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No education information found</p>
            )}
          </div>

          {/* Score Explanation */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-3">Score Breakdown</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Keyword Match (TF-IDF)</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${tfidfScore}%` }} />
                  </div>
                  <span className="font-medium text-slate-900 w-12 text-right">{tfidfScore}%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">Semantic Match</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${semanticScore}%` }} />
                  </div>
                  <span className="font-medium text-slate-900 w-12 text-right">{semanticScore}%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">Must-Have Skills</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${mustHaveTotal > 0 ? (mustHaveHits / mustHaveTotal) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="font-medium text-slate-900 w-12 text-right">
                    {mustHaveTotal > 0 ? Math.round((mustHaveHits / mustHaveTotal) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            {onDownload && (
              <Button variant="outline" className="gap-2" onClick={onDownload}>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            )}
            {onClose && (
              <Button variant="outline" className="ml-auto" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
