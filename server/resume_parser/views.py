from django.conf import settings

import os

from pyresparser import ResumeParser
from .utils import preprocess_text

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline

import tika
from tika import parser


@api_view(["POST"])
def match_resumes(request):
    # Start the Tika server
    tika.initVM()

    # Get job_id and resume files from the form data
    job_description = request.data.get("job_description")
    resume_keys = request.FILES.keys()
    resume_files = []

    for key in resume_keys:
        resume_files.append(request.data.get(key))

    if job_description:
        # Create a directory to store the resumes if it doesn't exist
        applicant_resumes_dir = "applicant_resumes/"


        # Process resumes and encode them using SentenceTransformer
        resumes = []
        resume_filenames = []
        for resume_file in resume_files:
            try:
                parsed_resume = parser.from_buffer(resume_file)
                resume_text = parsed_resume['content']
                resumes.append(preprocess_text(resume_text))
            except Exception as e:
                print(f"Error parsing resume: {str(e)}")
            file_name = str(resume_file.name).replace(" ", "_")
            resume_filenames.append(file_name)

            resume_path = os.path.join(applicant_resumes_dir, file_name)
            resume_path = os.path.join(settings.MEDIA_ROOT, resume_path)
            with open(resume_path, 'wb') as file:
                for chunk in resume_file.chunks():
                    file.write(chunk)

        job_details = job_description
    
        model = SentenceTransformer('sentence-transformers/all-MiniLM-L12-v2')
        resumes_encoded = model.encode(resumes)
        job_desc_encoded = model.encode([job_details])

        # Calculate cosine similarity between job description and resumes
        similarity_scores = util.pytorch_cos_sim(job_desc_encoded, resumes_encoded)

        # Sort resumes based on similarity scores
        sorted_resumes = [resume for _, resume in sorted(zip(similarity_scores[0], resume_filenames), reverse=True)]

        # Get top N matching resumes
        top_matches = sorted_resumes[:]

        # Create a list to store matched candidate details
        matched_candidates = []

        # Retrieve the applicant resumes directory
        applicant_resumes_dir = "applicant_resumes/"

        for idx, resume_filename in enumerate(top_matches):
            resume_path = os.path.join(applicant_resumes_dir, resume_filename)
            resume_url = os.path.join(settings.MEDIA_URL, resume_path)
            resume_path = os.path.join(settings.MEDIA_ROOT, resume_path)
            if os.path.exists(resume_path):
                # Create a dictionary to store candidate details
                candidate_details = {
                    "id": idx,
                    "resume": "http://127.0.0.1:8000" + resume_url,
                    "score": similarity_scores[0][top_matches.index(resume_filename)]*100,
                }

                data = ResumeParser(resume_path).get_extracted_data()
                candidate_details.update(data)
                matched_candidates.append(candidate_details)

        # Sort the candidates list based on the "score" key in each dictionary in descending order
        sorted_candidates = sorted(matched_candidates, key=lambda x: x["score"], reverse=True)

        return Response(sorted_candidates, status=status.HTTP_200_OK)
    else:
        return Response({"message": "invalid data given"}, status=status.HTTP_400_BAD_REQUEST)
