import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface JobCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    description: string;
    mustHaveSkills: string[];
    niceToHaveSkills: string[];
    minExperienceYears: number;
    location?: string;
  }) => void;
  isLoading?: boolean;
}

export function JobCreationModal({ open, onOpenChange, onSubmit, isLoading }: JobCreationModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mustHaveInput, setMustHaveInput] = useState("");
  const [niceToHaveInput, setNiceToHaveInput] = useState("");
  const [mustHaveSkills, setMustHaveSkills] = useState<string[]>([]);
  const [niceToHaveSkills, setNiceToHaveSkills] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState("0");
  const [location, setLocation] = useState("");

  const addMustHaveSkill = (skill: string) => {
    if (skill.trim() && !mustHaveSkills.includes(skill.trim())) {
      setMustHaveSkills([...mustHaveSkills, skill.trim()]);
      setMustHaveInput("");
    }
  };

  const addNiceToHaveSkill = (skill: string) => {
    if (skill.trim() && !niceToHaveSkills.includes(skill.trim())) {
      setNiceToHaveSkills([...niceToHaveSkills, skill.trim()]);
      setNiceToHaveInput("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || mustHaveSkills.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      mustHaveSkills,
      niceToHaveSkills,
      minExperienceYears: parseInt(minExperience) || 0,
      location: location.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setMustHaveSkills([]);
    setNiceToHaveSkills([]);
    setMinExperience("0");
    setLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Job Posting</DialogTitle>
          <DialogDescription>Add a new job position with required skills and experience level</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Software Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., San Francisco, CA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Minimum Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">Minimum Experience (years)</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
            />
          </div>

          {/* Must-Have Skills */}
          <div className="space-y-2">
            <Label htmlFor="must-have">Must-Have Skills * (Critical for the role)</Label>
            <div className="flex gap-2">
              <Input
                id="must-have"
                placeholder="Add a skill and press Enter or click Add"
                value={mustHaveInput}
                onChange={(e) => setMustHaveInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMustHaveSkill(mustHaveInput);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addMustHaveSkill(mustHaveInput)}
                disabled={!mustHaveInput.trim()}
              >
                Add
              </Button>
            </div>

            {mustHaveSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {mustHaveSkills.map((skill) => (
                  <Badge key={skill} className="gap-1">
                    {skill}
                    <button
                      onClick={() => setMustHaveSkills(mustHaveSkills.filter((s) => s !== skill))}
                      className="ml-1 hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Nice-to-Have Skills */}
          <div className="space-y-2">
            <Label htmlFor="nice-to-have">Nice-to-Have Skills (Preferred but not required)</Label>
            <div className="flex gap-2">
              <Input
                id="nice-to-have"
                placeholder="Add a skill and press Enter or click Add"
                value={niceToHaveInput}
                onChange={(e) => setNiceToHaveInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addNiceToHaveSkill(niceToHaveInput);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addNiceToHaveSkill(niceToHaveInput)}
                disabled={!niceToHaveInput.trim()}
              >
                Add
              </Button>
            </div>

            {niceToHaveSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {niceToHaveSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      onClick={() => setNiceToHaveSkills(niceToHaveSkills.filter((s) => s !== skill))}
                      className="ml-1 hover:bg-black/10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading} className="ml-auto">
              {isLoading ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
