package com.pioneer.dips.diagnosis;

import java.util.Random;
import java.util.stream.Stream;
import org.springframework.stereotype.Component;

import weka.classifiers.bayes.NaiveBayesUpdateable;
import weka.classifiers.evaluation.Evaluation;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

@Component
public class DiseaseClassifier {
	
		static Instances structure;

	public Instances loadData(String filepath) throws Exception {
		DataSource source = new DataSource(filepath);
		structure = source.getDataSet();		
		return structure;
	}
	
	public NaiveBayesUpdateable buildClassifier(NaiveBayesUpdateable nbu, String file) throws Exception {
		loadData(file);
		structure.setClassIndex(0);
		nbu.buildClassifier(structure);
		System.out.println("Attributes # "+ structure.numAttributes()+",Instances #"+ structure.numInstances());
		return nbu;
	}
	public void classify(NaiveBayesUpdateable nbu, String token) throws Exception {
		double[] arr = Stream.of(token.split(","))
                .mapToDouble (Double::parseDouble)
               .toArray();
		Instance test = new DenseInstance(structure.instance(0));
		for (int i=1; i <structure.numAttributes();i++) {
			test.setValue(i, arr[i-1]);
			};
			structure.add(test);		
			//double instClass = nbm.classifyInstance(str.instance(str.numInstances()-1));
			double[] probClasses = nbu.distributionForInstance(structure.instance(structure.numInstances()-1));
			String[] diseases = new String[3];
			int[] indexOfDiseases = new int[3];
			double[] nbProb =new double[3];
			nbProb[0]=nbProb[1]=nbProb[2]= 0.0; 
			for(int i=0;i< probClasses.length;i++) {
				if(probClasses[i]> nbProb[0]) {
					nbProb[2] = nbProb[1];
					nbProb[1] = nbProb[0];
					nbProb[0] = probClasses[i];
					indexOfDiseases[0] = i;
				}
				else if(probClasses[i]> nbProb[1]) {
					nbProb[2] = nbProb[1];
					nbProb[1] = probClasses[i];
					indexOfDiseases[1] = i;
				}
				else if(probClasses[i]> nbProb[2]) {
					nbProb[2] = probClasses[i];
					indexOfDiseases[2] = i;
				}
			}
			diseases[0]= structure.attribute(0).value(indexOfDiseases[0]);
			diseases[1]= structure.attribute(0).value(indexOfDiseases[1]);
			diseases[2]= structure.attribute(0).value(indexOfDiseases[2]);
			System.out.println("=======================================================");
			System.out.println("===<< R E S U L T >>===================================");
			System.out.println("__________________________________");
			System.out.println("Most probably you have,\n"+ diseases[0]+"( "+nbProb[0]+" )");
			System.out.println("__________________________________");
			//System.out.println("Disease Instance = "+str.attribute(0).value((int)instClass));
			System.out.println("=======================================================");
			System.out.println(test.toString());
	}
		//String token = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
		
	public void evaluate(NaiveBayesUpdateable nbu) throws Exception {
		Evaluation eval = new Evaluation(structure);
		eval.crossValidateModel(nbu, structure, 10,  new Random(1));
		System.out.println(eval.toSummaryString("\nResults\n======\n", false));
		}
	
	
}
